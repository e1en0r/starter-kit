import styled from '@emotion/styled';
import { Paper, PaperProps } from '@phork/phorkit';
import { viewports } from 'config/viewports';
import { getPaperTopOffset, getPaperSideOffset } from '../utils/size';

export type PagePaperProps = PaperProps & {
  autoHeight?: boolean;
  centered?: boolean;
};

export const PagePaper = styled(Paper, {
  shouldForwardProp: (prop: string) => !['autoHeight', 'centered'].includes(prop),
})<{ autoHeight?: boolean; centered?: boolean }>`
  ${({ autoHeight }) => !autoHeight && 'min-height: 100%;'}
  ${({ centered }) => centered && `align-items: center; justify-content: center;`}

  background: transparent;
  padding: ${getPaperTopOffset(viewports.medium.max)}px ${getPaperSideOffset(viewports.medium.max)}px;
  position: relative;

  @media (max-width: ${viewports.small.max}px) {
    padding: ${getPaperTopOffset(viewports.small.max)}px ${getPaperSideOffset(viewports.small.max)}px;
  }
`;

PagePaper.displayName = 'PagePaper';
