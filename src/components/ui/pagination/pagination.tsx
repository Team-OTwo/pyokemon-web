import { Pagination as AntdPagination } from "antd"
import styled from "styled-components"

const StyledPagination = styled(AntdPagination)`
  &.ant-pagination {
    &&& .ant-pagination-item,
    &&& .ant-pagination-item-link {
      border-radius: 2px;

      &:hover {
        &:not(:disabled) {
          background-color: var(--color-primary);
        }
      }
    }
    &&& .ant-pagination-item-active {
      border-color: transparent !important;
      background-color: transparent !important;
    }
  }
`

interface PaginationProps extends React.ComponentProps<typeof AntdPagination> {}

function Pagination({ size = "small", ...props }: PaginationProps) {
  return <StyledPagination size={size} {...props} />
}

export default Pagination
