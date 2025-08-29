export default function Feedback() {
    return (
        <div className="feedback">
            <h2>Feedback</h2>
            <form method="post">
                <textarea name="feedback-input" id="feedback-input" placeholder="My feedback goes here..."></textarea>
                <input type="submit" value="Send" />
            </form>
        </div>
    );
}
