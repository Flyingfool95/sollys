export default function Feedback() {
    return (
        <form method="post" className="feedback">
            <h2>Feedback</h2>
            <textarea name="feedback-input" id="feedback-input" placeholder="My feedback goes here..."></textarea>
            <input type="submit" value="Send" />
        </form>
    );
}
