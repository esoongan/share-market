import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Radio } from '@material-ui/core';
import {testContracts} from 'constant/test'
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
	tableRow: {
		'&:hover': {
			background: grey[100],
		}
	},
  container: {
    maxHeight: 440,
  },
	contractTable: {
		width: '60%'
	}
});

function createData(postTitle, contracts) {
  return {
    postTitle,
    contracts		//array [ contract1, contract2, ...]
		/*
			{
            "id": 1,
            "postId": 1,
            "sellerId": 1,
            "buyerId": 2,
            "startDate": "2021-05-09",
            "endDate": "2021-05-11",
            "state": "accept"
        },
		*/
  };
}

function Row({row}) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
	const [selectedContract, setSelectedContract] = React.useState(-1);
  const handleChange = (event) => {
    setSelectedContract(event.target.value);
  };
  return (
    <React.Fragment>
      <TableRow className={classes.tableRow} onClick={() => setOpen(!open)}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.postTitle}</TableCell>
        <TableCell>{row.contracts.length}</TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                거래 요청 내역
              </Typography>
              <Table className={classes.contractTable} aria-label="contract-table" size='small'>
                <TableHead>
                  <TableRow>
										<TableCell> </TableCell>
										<TableCell>상태</TableCell>
                    <TableCell>희망 대여 날짜</TableCell>
                    <TableCell>희망 반납 날짜</TableCell>
                    <TableCell align="right">예상 수익(₩)</TableCell>
                    <TableCell align="right">보낸 사람</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.contracts.map((contractRow) => (
                    <TableRow key={contractRow.date}>
											<TableCell>
												<Radio
													checked={selectedContract === contractRow.id.toString()}
													onChange={handleChange}
													value={contractRow.id}
													name="radio-button-contract"
												/>
											</TableCell>
											<TableCell>{contractRow.state}</TableCell>
                      <TableCell>{contractRow.startDate}</TableCell>
											<TableCell>{contractRow.endDate}</TableCell>
                      <TableCell align="right">예상 수입</TableCell>
                      <TableCell align="right">{contractRow.buyerId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


const rows = [
  createData('post title1', testContracts),
  createData('post title2', testContracts),
  createData('post title3', testContracts),
  createData('post title4', testContracts),
  createData('post title5', testContracts),
  createData('post title5', testContracts),
  createData('post title5', testContracts),
];

export default function Contracts() {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table aria-label="collapsible table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>게시글</TableCell>
            <TableCell>요청 건수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
