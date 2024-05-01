import styled from "styled-components";

const B = styled.b`position: relative;
  font-size: ${(p) => p.bFontSize}
  line-height: ${(p) => p.bLineHeight}
  display: ${(p) => p.bDisplay}
  min-width: ${(p) => p.bMinWidth}
`;
const Property1defaultRoot = styled.div`width: 160px;
  border-radius: var(--br-3xs);
  background-color: var(--main-blue);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: var(--padding-base) var(--padding-13xl);
  box-sizing: border-box;
  text-align: center;
  font-size: var(--l-bold-size);
  color: var(--white);
  font-family: var(--l-bold);
  width: ${(p) => p.property1DefaultWidth}
  padding: ${(p) => p.property1DefaultPadding}
  border: ${(p) => p.property1DefaultBorder}
  position: ${(p) => p.property1DefaultPosition}
  top: ${(p) => p.property1DefaultTop}
  left: ${(p) => p.property1DefaultLeft}
`;

const Property1Default5 = ({
  prop,
  property1DefaultWidth,
  property1DefaultPadding,
  property1DefaultBorder,
  bFontSize,
  bLineHeight,
  bDisplay,
  bMinWidth,
  property1DefaultPosition,
  property1DefaultTop,
  property1DefaultLeft,
}) => {
  return (
    <Property1defaultRoot
      property1DefaultWidth={property1DefaultWidth}
      property1DefaultPadding={property1DefaultPadding}
      property1DefaultBorder={property1DefaultBorder}
      property1DefaultPosition={property1DefaultPosition}
      property1DefaultTop={property1DefaultTop}
      property1DefaultLeft={property1DefaultLeft}
    >
      <B
        bFontSize={bFontSize}
        bLineHeight={bLineHeight}
        bDisplay={bDisplay}
        bMinWidth={bMinWidth}
      >
        {prop}
      </B>
    </Property1defaultRoot>
  );
};

export default Property1Default5;
