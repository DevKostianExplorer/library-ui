/* eslint-disable react/jsx-key */
import { UsersPageProps } from "./UsersPage.props";
import styles from './UsersPage.module.css';
import cn from 'classnames';
import { Container, Row, Col } from "react-grid-system";
import { BookList } from "../../Components/BookList/BookList";
import { Filter } from "../../Components/Filter/Filter";
import { Top } from "../../Components/Top/Top";
import ReactTable, { usePagination, useSortBy, useTable, useGlobalFilter, useAsyncDebounce } from "react-table";
import { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { IUser } from "../../store/models/IUser";
import { userAPI } from "../../services/UserService";
import { Button } from "react-bootstrap";
import { Modal } from "../../Components/Export";
import 'regenerator-runtime/runtime';



export const UsersPage = ({ className, ...props }: UsersPageProps) => {
    const { data: Users, error, isLoading, refetch } = userAPI.useGetAllUsersQuery();
    const [deleteUser, {}] = userAPI.useDeleteUserMutation();
    const data = useMemo<IUser[]>(
        () => Users ? Users : [],
        [Users]
    )

    function GlobalFilter({
        preGlobalFilteredRows,
        globalFilter,
        setGlobalFilter,
      }) {
        const count = preGlobalFilteredRows.length
        const [value, setValue] = useState(globalFilter)
        const onChange = useAsyncDebounce(value => {
          setGlobalFilter(value || undefined)
        }, 200)
      
        return (
          <span>
            Search:{' '}
            <input
              value={value || ""}
              onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
              placeholder={`${count} records...`}
              style={{
                fontSize: '1.1rem',
                        border: '0',
                    }}
                />
            </span>
        )
    }


    const columns: readonly ReactTable.Column<IUser>[] = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id', // accessor is the "key" in the data
            },
            {
                Header: 'Role',
                accessor: 'role_id',
            },
            {
                Header: 'Forename',
                accessor: 'forename',
            },
            {
                Header: 'Surname',
                accessor: 'surname',
            },
            {
                Header: 'Middle Name',
                accessor: 'middleName',
            },
            {
                Header: 'Phone Number',
                accessor: 'phone_number',
            },
            {
                Header: 'Login',
                accessor: 'login_name',
            },
            {
                Header: 'Email',
                accessor: 'email_address',
            },
            {
                Header: "Delete",
                id: "delete",
                accessor: (str) => "delete",

                Cell: (tableProps: any) => (
                    <Button variant="danger" onClick={(e) => { deleteUser(data[tableProps.row.index].id); refetch() }}>Delete</Button>
                )
            }
        ],
        [data, deleteUser, refetch]
    )
    const tableInstance = useTable({ columns, data },
        useGlobalFilter,
        useSortBy,
        usePagination,)




    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = tableInstance

    return (

        <div className={cn(styles.div, className)} {...props}>
            <Container fluid>
                <Row>
                    <Col md={2}></Col>
                    <Col md={7} className={cn(styles.bookelement, className)}>
                        <Container>
                            <Table striped {...getTableProps()}>
                                <thead>
                                    {
                                        headerGroups.map(headerGroup => (

                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {
                                                    headerGroup.headers.map(column => (

                                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                            {
                                                                column.render('Header')}
                                                            <span>
                                                                {column.isSorted
                                                                    ? column.isSortedDesc
                                                                        ? ' 🔽'
                                                                        : ' 🔼'
                                                                    : ''}
                                                            </span>
                                                        </th>
                                                    ))}
                                            </tr>
                                        ))}
                                    <tr>
                                        <th
                                            colSpan={visibleColumns.length}
                                            style={{
                                                textAlign: 'left',
                                            }}
                                        >
                                            <GlobalFilter
                                                preGlobalFilteredRows={preGlobalFilteredRows}
                                                globalFilter={state.globalFilter}
                                                setGlobalFilter={setGlobalFilter}
                                            />
                                        </th>
                                    </tr>
                                </thead>
                                {/* Apply the table body props */}
                                <tbody {...getTableBodyProps()}>
                                    {// Loop over the table rows
                                        rows.map(row => {
                                            // Prepare the row for display
                                            prepareRow(row)
                                            return (
                                                // Apply the row props
                                                <tr {...row.getRowProps()}>
                                                    {// Loop over the rows cells
                                                        row.cells.map(cell => {
                                                            // Apply the cell props
                                                            return (
                                                                <td {...cell.getCellProps()}>
                                                                    {// Render the cell contents
                                                                        cell.render('Cell')}
                                                                </td>
                                                            )
                                                        })}

                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </Table>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}