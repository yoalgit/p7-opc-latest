import { useState } from "react";

// Components
import { Main } from "../utils/style/styles";
import AddArticleModal from "../components/Home/AddArticleModal";
import { StyledButton } from "../utils/style/styles";
import ArticlesList from "../components/Shared/ArticlesList";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [articleListEdited, setArticleListEdited] = useState(true);

  return (
    <Main className="d-flex flex-column align-items-center py-3">
      <h1>Le forum de Groupomania</h1>
      <StyledButton
        $outline
        className="rounded-pill my-4"
        onClick={() => setModalShow(true)}
      >
        Publier un article
      </StyledButton>
      <AddArticleModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
        setArticleListEdited={setArticleListEdited}
      />

      <ArticlesList
        articleListEdited={articleListEdited}
        setArticleListEdited={setArticleListEdited}
      />
    </Main>
  );
};

export default Home;
