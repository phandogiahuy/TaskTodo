import { Image } from "semantic-ui-react";
import {
  HeaderContainer,
  ImageContainer,
  NameContainer,
  TextHeader,
} from "./style";

const Headers = () => {
  return (
    <HeaderContainer>
      <ImageContainer>
        <Image src="logoUni.png" size="large" />
      </ImageContainer>
      <NameContainer>
        <TextHeader>UniqueTechnology Todo</TextHeader>
      </NameContainer>
    </HeaderContainer>
  );
};

export default Headers;
