import React, { useState } from 'react';
import { Rate, Input, List, Card } from 'antd';
import styles from "./ReviewsAndRatings.module.css"
import { ButtonComp } from '../Commons/ButtonComp/ButtonComp';
import { ErrorAlert, SuccessAlert, WarningAlert } from '../Commons/Messages/Messages';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import { isAuthenticated } from '../Commons/Auth/Auth';

const { TextArea } = Input;

const ReviewsAndRatings = ({ reviews, product, updateParent }) => {
    const [currentReview, setCurrentReview] = useState('');
    const [currentRating, setCurrentRating] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleReviewChange = (e) => {
        setCurrentReview(e.target.value);
    };

    const handleRatingChange = (value) => {
        setCurrentRating(value);
    };

    const handleSubmit = async () => {
        if (isAuthenticated()) {
            if (currentReview && currentRating) {
                setLoading(true);
                await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/add-review/${product?._id}`, { review: currentReview, rating: currentRating }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(async (res) => {
                    setLoading(false);
                    if (res.status === 200) {
                        SuccessAlert(res.data.successMessage);
                        updateParent();
                    }
                    else {
                        ErrorAlert(res.data.errorMessage);
                    }
                }).catch(err => {
                    setLoading(false);
                    console.log(err)
                })
                setCurrentReview('');
                setCurrentRating(0);
            }
        } else {
            WarningAlert("Please login to leave a review");
        }
    };

    return (
        <div className={styles.ReviewsAndRatings}>
            <Card className={styles.card}>
                <h2 className="">Leave a Review</h2>
                <Rate onChange={handleRatingChange} value={currentRating} />
                <div className='max-w-[510px]'>
                    <TextArea
                        rows={4}
                        value={currentReview}
                        onChange={handleReviewChange}
                        placeholder="Write your review here"
                        className={styles.input}
                    />
                    <div className='mt-4'>
                        <ButtonComp text="Submit" onClick={handleSubmit} disabled={!currentReview || !currentRating || loading} />
                    </div>
                </div>
            </Card>
            {
                reviews?.length > 0 &&
                <div className="mt-5">
                    <h2 className="mb-4">Reviews ({reviews?.length})</h2>
                    <List
                        itemLayout="horizontal"
                        dataSource={reviews}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<UserOutlined />}
                                    title={item?.user?.firstName + " " + item?.user?.lastName}
                                    description={
                                        <div>
                                            <Rate disabled value={item?.rating} />
                                            <p>{item?.review}</p>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
            }
        </div>
    );
};

export default ReviewsAndRatings;