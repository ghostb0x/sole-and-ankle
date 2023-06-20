import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Wrapper>
      <Link href={`/shoe/${slug}`}>
        <Wrapper>
          <ImageWrapper>
            <Image
              alt=""
              src={imageSrc}
            />
            {variant !== 'default' ? (
              <VariantFlag type={variant} />
            ) : null}
          </ImageWrapper>
          <Spacer size={12} />
          <Row>
            <Name>{name}</Name>
            {variant === "on-sale" 
            ? <StrikethroughPrice>{formatPrice(price)}</StrikethroughPrice>
            : <Price>{formatPrice(price)}</Price>
            }
            
          </Row>
          <Row>
            <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
            {variant === "on-sale"
            ? <SalePrice>{formatPrice(salePrice)}</SalePrice>
            : null
            }
          </Row>
        </Wrapper>
      </Link>
    </Wrapper>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  flex: 1 1 300px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${COLORS.gray[900]}
`;

const StrikethroughPrice = styled(Price)`
  text-decoration: line-through;
  color: ${COLORS.gray[700]}
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;


const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;


const VariantFlag = ({ type }) => {
  let bgColor;

  if (type === 'on-sale') {
    bgColor = COLORS.primary;
    return <StyledSpan bgColor={bgColor}>Sale</StyledSpan>;
  } else if (type === 'new-release') {
    bgColor = COLORS.secondary;
    return <StyledSpan bgColor={bgColor}>Just Released!</StyledSpan>;
  }
}

const StyledSpan = styled.span`
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 7px 10px;
  border-radius: 2px;
  color: white;
  background-color: ${p => p.bgColor};
  font-size: ${14/16}rem;
  font-weight: ${WEIGHTS.bold};
`;

export default ShoeCard;
