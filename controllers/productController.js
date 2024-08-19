const Product = require('../models/productModel');

const createIndexes = async () => {
  try {
    await Product.collection.dropIndexes();

    await Product.collection.createIndex({ Title: 1 });
    await Product.collection.createIndex({ Make: 1 });
    await Product.collection.createIndex({ Model: 1 });
    await Product.collection.createIndex({ Part: 1 });
    await Product.collection.createIndex({ PartAccessorries: 1 });
    await Product.collection.createIndex({ Featured: 1 });

    console.log('Indexes created successfully.');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(20)
      .exec();
    if (products) {
      res.status(200).send(products);
    } else {
      res.status(404).json({ errorMessage: 'No Products found!' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

exports.getLimitedProducts = async (req, res) => {
  try {
    let minPrice;
    let maxPrice;
    if (req.body.priceRange) {
      minPrice = req.body.priceRange?.split("-")[0];
      maxPrice = req.body.priceRange?.split("-")[1];
    } else {
      minPrice = 0;
      maxPrice = 30000;
    }

    let query = {};

    if (req.body.Make) {
      query.Make = req.body.Make;
    }

    if (req.body.Model) {
      query.Model = req.body.Model;
    }

    if (req.body.Part) {
      query.Part = req.body.Part;
    }

    if (req.body.title) {
      const searchWords = req.body.title.split(" ").map(word => `(?=.*${word})`).join("");
      const regex = new RegExp(`^${searchWords}.*$`, "i");
      query.Title = { $regex: regex };
    }

    if (req.body.PartAccessory) {
      query.PartAccessorries = req.body.PartAccessory;
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice }; // Filter by price range
    }

    const PAGE_SIZE = 20;
    const page = parseInt(req.body.page || "0");

    // Sorting logic based on the sort option selected
    let sortOption = {};
    switch (req.body.sortBy) {
      case "lth":
        sortOption.Price = 1; // Price: Low to High
        break;
      case "htl":
        sortOption.Price = -1; // Price: High to Low
        break;
      case "a-z":
        sortOption.Title = 1; // Product Name: A-Z
        break;
      case "z-a":
        sortOption.Title = -1; // Product Name: Z-A
        break;
      case "createdAt":
      default:
        sortOption.createdAt = -1; // Released Date (default)
        break;
    }

    const products = await Product.find(query)
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page)
      .populate("Reviews.user")
      .sort(sortOption)
      .exec();

    const count = await Product.countDocuments(query);
    if (products) {
      res.status(200).send({ products, count });
    } else {
      res.status(404).json({ errorMessage: "No Products found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};


exports.getFeaturedProducts = async (req, res) => {
  // createIndexes();
  const products = await Product.find({ Featured: "yes" }).limit(20).sort({ "createdAt": '-1' }).populate("Reviews.user")
    .exec();
  try {
    if (products) {
      res.status(200).send(products);
    } else {
      res.status(404).json({ errorMessage: 'No Products found!' });
    }
  } catch (error) {
    res.status(404).json({ errorMessage: 'Error in finding products', error });
  }

}

exports.getAllProductsParts = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: '$Part',
          CategoryImage: { $first: '$CategoryImage' }
        }
      },
      {
        $project: {
          _id: 0,
          Part: '$_id',
          CategoryImage: 1
        }
      }
    ]);

    res.json(categories.map(c => ({ part: c.Part, image: c?.CategoryImage })));
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

exports.getAllProductsMakes = async (req, res) => {
  try {
    const Makes = await Product.aggregate([
      {
        $group: {
          _id: '$Make',
          BrandImage: { $first: '$BrandImage' } // Assuming BrandImage is the same for all products of the same make
        }
      },
      {
        $project: {
          _id: 0,
          Make: '$_id',
          BrandImage: 1
        }
      }
    ]);

    res.json(Makes.map(c => ({ make: c.Make, image: c.BrandImage })));
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}


exports.getAllProductsModelsByMake = async (req, res) => {
  const { Make } = req.body;

  if (!Make) {
    return res.status(400).json({ error: 'Make is required' });
  }

  try {
    const Models = await Product.aggregate([
      {
        $match: {
          Make: Make
        }
      },
      {
        $group: {
          _id: '$Model'
        }
      },
      {
        $project: {
          _id: 0,
          Model: '$_id'
        }
      }
    ]);

    res.json(Models.map(m => m.Model));
  } catch (err) {
    res.status(500).send(err.message);
  }
}

exports.getAllProductsPartsByModel = async (req, res) => {
  const { Model } = req.body;

  if (!Model) {
    return res.status(400).json({ error: 'Model is required' });
  }

  try {
    const Parts = await Product.aggregate([
      {
        $match: {
          Model: Model
        }
      },
      {
        $group: {
          _id: '$Part'
        }
      },
      {
        $project: {
          _id: 0,
          Part: '$_id'
        }
      }
    ]);

    res.json(Parts.map(m => m.Part));
  } catch (err) {
    res.status(500).send(err.message);
  }
}

exports.getAllProductsPartAccessorriesByPart = async (req, res) => {
  const { Part } = req.body;

  if (!Part) {
    return res.status(400).json({ error: 'Part is required' });
  }

  try {
    const PartAccessorries = await Product.aggregate([
      {
        $match: {
          Part: Part
        }
      },
      {
        $group: {
          _id: '$PartAccessorries'
        }
      },
      {
        $project: {
          _id: 0,
          PartAccessorries: '$_id'
        }
      }
    ]);

    res.json(PartAccessorries.map(m => m.PartAccessorries));
  } catch (err) {
    res.status(500).send(err.message);
  }
}

exports.getAllAdminProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("Reviews.user")
      .exec();
    if (products) {
      res.status(200).send(products);
    } else {
      res.status(404).json({ errorMessage: 'No Products found!' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

exports.getProductById = async (req, res) => {
  try {
    const findProduct = await Product.findOne({ _id: req.params.id }).populate("Reviews.user").exec();
    if (findProduct) {
      res.status(200).send(findProduct);
    } else {
      res.status(404).json({ errorMessage: 'No Products found!' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

exports.searchProducts = async (req, res) => {
  try {
    const findProducts = await Product.find({ $or: [{ Title: { $regex: new RegExp(req.body.Title, 'i') } }, { subTTitle: { $regex: new RegExp(req.body.Title, 'i') } }] })

      .exec();
    if (findProducts) {
      res.status(200).json(findProducts);
    } else {
      res.status(404).json({ errorMessage: 'No products found' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'Error in finding products', error });
  }
};


exports.uploadBulkProducts = async (req, res) => {
  const { products } = req.body;

  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ errorMessage: 'Invalid products array' });
  }
  console.log("upload started");
  try {
    const batchSize = 10000; // Define the size of each batch
    const totalProducts = products.length;

    for (let i = 0; i < totalProducts; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      await Product.insertMany(batch);
      console.log("Batch inserted", batch);
    }

    res.status(200).send({ successMessage: 'Products uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ errorMessage: 'Failed to create products. Please try again', error });
  }
}

exports.uploadProduct = async (req, res) => {
  try {
    const product = new Product({
      Title: req.body.Title,
      Price: req.body.Price,
      Description: req.body.Description,
      Pictures: req.body.Pictures,
      Featured: req.body.Featured,
      Make: req.body.Make,
      Model: req.body.Model,
      Part: req.body.Part,
      PartAccessorries: req.body.PartAccessorries,
      Location: req.body.Location,
      Condition: req.body.Condition,
      ModelCode: req.body.ModelCode,
      RegistrationYear: req.body.RegistrationYear,
      Mileage: req.body.Mileage,
      MissionType: req.body.MissionType,
      engineModel: req.body.engineModel,
      EngineSize: req.body.EngineSize,
      Fuel: req.body.Fuel,
      Drive: req.body.Drive,
      AutoPartsMaker: req.body.AutoPartsMaker,
      GenuinePartsNo: req.body.GenuinePartsNo,
      ChassisNo: req.body.ChassisNo,
      RefNo: req.body.RefNo,
      GearType: req.body.GearType
    });

    await product.save((error, result) => {
      if (error) {
        res.status(400).json({ errorMessage: 'Failed to create product. Please try again', error });
      } else {
        res.status(200).send({ successMessage: 'Product created successfully', result });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};



exports.updateProduct = async (req, res) => {
  try {
    const findProduct = await Product.findById({ _id: req.params.id });
    if (findProduct) {
      findProduct.Title = req.body.Title;
      findProduct.Price = req.body.Price;
      findProduct.Description = req.body.Description;
      findProduct.Pictures = req.body.Pictures;
      findProduct.Featured = req.body.Featured;
      findProduct.Make = req.body.Make;
      findProduct.Model = req.body.Model;
      findProduct.Part = req.body.Part;
      findProduct.PartAccessorries = req.body.PartAccessorries;
      findProduct.Location = req.body.Location;
      findProduct.Condition = req.body.Condition;
      findProduct.ModelCode = req.body.ModelCode;
      findProduct.RegistrationYear = req.body.RegistrationYear;
      findProduct.Mileage = req.body.Mileage;
      findProduct.MissionType = req.body.MissionType;
      findProduct.engineModel = req.body.EngineModel;
      findProduct.EngineSize = req.body.EngineSize;
      findProduct.Fuel = req.body.Fuel;
      findProduct.Drive = req.body.Drive;
      findProduct.AutoPartsMaker = req.body.AutoPartsMaker;
      findProduct.GenuinePartsNo = req.body.GenuinePartsNo;
      findProduct.ChassisNo = req.body.ChassisNo;
      findProduct.RefNo = req.body.RefNo;
      findProduct.GearType = req.body.GearType;

      await findProduct.save((error, result) => {
        if (error) {
          res.status(400).json({ errorMessage: 'Failed to update product. Please try again', error });
        } else {
          res.status(200).send({ successMessage: 'Product updated successfully', result });
        }
      });
    } else {
      res.status(404).json({ errorMessage: 'Product not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.addProductReview = async (req, res) => {
  const { rating, review } = req.body;
  try {
    Product.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { Reviews: { user: req.user?._id, rating, review } } },
      function (error, success) {
        if (error) {
          console.log(error);
          res.status(400).json({ errorMessage: 'Failed to add review. Please try again', error });
        }
        if (success) {
          res.status(200).send({ successMessage: 'Product review added successfully' });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.removeProductReview = async (req, res) => {
  try {
    Product.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { Reviews: { _id: req.body.reviewId } } },
      function (error, success) {
        if (error) {
          console.log(error);
          res.status(400).json({ errorMessage: 'Failed to add review. Please try again', error });
        }
        if (success) {
          res.status(200).send({ successMessage: 'Product review added successfully' });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};



exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    if (product) {
      product.remove();
      res.status(200).json({ successMessage: 'Product Deleted Successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

exports.getRelatedProducts = async (req, res) => {
  const { Make, Model, Part } = req.body;
  try {
    if (Make, Model, Part) {
      const products = await Product.find({ Make, Part, Model }).limit(6).exec();
      if (products) {
        res.status(200).send(products);
      } else {
        res.status(201).json({ errorMessage: 'No Related Products' });
      }
    } else {
      const products = await Product.find({ Make, Model, Part }).limit(6).exec();
      if (products) {
        res.status(200).send(products);
      } else {
        res.status(201).json({ errorMessage: 'No Related Products' });
      }
    }
  } catch (error) {
    console.log(error);
  }
}


