import { connect } from "react-redux";
import { createCarrierPost } from "../../actions/carrier_post_actions";
import { clearErrors } from "../../actions/session_actions";

const mapStateToProps = (state, ownProps) => {
  const question = state.carrier_posts[ownProps.match.params.carrierPostId];
  const currentUserId = Boolean(state.session.user.id)
    ? state.session.user.id
    : -1;

  return {
    question: question || {
      origin: "",
      destination: "",
      max_weight: 0,
      transportaion: "",
      carrier_id: 0,
    },
    currentUserId: currentUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestQuestion: (questionId) => dispatch(requestQuestion(questionId)),
    deleteQuestion: (questionId) => dispatch(deleteQuestion(questionId)),
    deleteAnswer: (questionId, answerId) => dispatch(deleteAnswer(questionId, answerId)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionShow);