import { useHistory } from "react-router-dom";
import routes from "routes";

const useGoBackSafely = () => {
  const history = useHistory();

  return () => {
    if (window.history.length > 2) {
      history.goBack();
    } else {
      history.replace(routes.posts.index);
    }
  };
};

export default useGoBackSafely;
