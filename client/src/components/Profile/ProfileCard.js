// Components
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ProfilePic from "../Shared/ProfilePic";
import SocialLink from "./SocialLink";
import CardBase from "../Shared/CardBase";

// Role translating table
const roles = {
  admin: "Admin",
  moderator: "Modérateur",
};

const ProfileCard = ({ profile }) => {
  const { id, role, firstname, lastname, bio, profilePic, ...socials } =
    profile;

  return (
    <CardBase>
      <Card.Header className="bg-white d-flex flex-column align-items-center position-relative">
        {role !== "user" && (
          <Badge className="position-absolute top-0 end-0 bg-secondary">
            {roles[role]}
          </Badge>
        )}
        <ProfilePic
          src={profilePic}
          alt={`Photo de profil de ${firstname} ${lastname}`}
          type={"profile"}
        />
        <Card.Title as="h1" className="mt-3">
          {firstname} {lastname}
        </Card.Title>

        {bio && <p>{bio}</p>}
      </Card.Header>

      <Card.Text className="d-flex gap-2 justify-content-center mt-4">
        {Object.entries(socials).map(
          (social) =>
            social[1] && (
              <SocialLink
                key={`${social[0]}-${id}`}
                href={social[1]}
                type={`${social[0]}`.slice(0, -7)}
              />
            )
        )}
      </Card.Text>
    </CardBase>
  );
};

export default ProfileCard;
