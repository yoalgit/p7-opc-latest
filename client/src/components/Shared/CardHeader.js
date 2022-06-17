// Components
import Card from "react-bootstrap/Card";
import ProfilePic from "./ProfilePic";
import AuthorLink from "../Home/AuthorLink";
import PublishedTime from "../Home/PublishedTime";

const CardHeader = ({ type, data, children }) => {
  return (
    <>
      <Card.Header
        className={
          type === "article"
            ? "bg-white border-bottom-0 d-flex px-0 px-md-3"
            : "bg-white border-bottom-0 d-flex p-0 mb-2"
        }
      >
        <ProfilePic
          src={data.user.profilePic}
          alt={`Photo de profil de ${data.user.firstname} ${data.user.lastname}`}
          type={type}
        />
        <div
          className={
            type === "article"
              ? "col d-flex flex-column justify-content-center border-bottom border-3 ms-3"
              : "col d-flex flex-column justify-content-center ms-2"
          }
        >
          <AuthorLink
            firstname={data.user.firstname}
            lastname={data.user.lastname}
            type={type}
            userId={data.user.id}
          />

          <PublishedTime inArticle createdAt={data.createdAt} className="m-0" />
        </div>
        {children}
      </Card.Header>
    </>
  );
};

export default CardHeader;
