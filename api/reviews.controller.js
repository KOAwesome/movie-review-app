import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const movieId = parseInt(req.body.movieId)
            const review = req.body.review
            const user = req.body.user
            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                user,
                review
            )
            res.json({ status: "success" })
        }
        catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetReview(req, res, next) {
        try {
            let id = req.params.id || {}
            let review = await ReviewsDAO.getReview(id)
            if (!review) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(review)
        }
        catch (e) {
            console.log(`api ${e}`)
            res.status(500).json({ error: e })
        }
    }
    static async apiPutReview(req, res, next) {
        try {
            const reviewId = req.params.id
            const review = req.body.review
            const user = req.body.user

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                user,
                review
            )
            var { error } = reviewResponse //??
            if (error) {
                res.status(400).json({ error })
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error(" Unable to update review")
            }
            res.json({ status: "success" })

        }

        catch (e) {
            res.status(500).json({ error: e.message })
            console.log(``)
        }
    }
    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.params.id;
            const deletionInfo = await ReviewsDAO.deleteReview(reviewId);

            if (deletionInfo.deletedCount === 0) {
                return res.status(404).json({ error: "Review not found" });
            }

            res.json({ status: "success" });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: e.message });
        }
    }
    static async apiGetReviews(req, res, next) {
        try {
            let id = req.params.id || {}
            let reviews = await ReviewsDAO.getReviewsByMovieId(id)
            if (!reviews) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(reviews)
        }
        catch (e) {
            console.log(`api ${e}`)
            res.status(500).json({ error: e })
        }
    }
}