import * as React from 'react';
import { uniqueNamesGenerator, NumberDictionary } from 'unique-names-generator';
import { CircularProgressbar } from 'react-circular-progressbar';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import 'react-circular-progressbar/dist/styles.css';
import './reports.css';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { blueGrey } from '@mui/material/colors';
import { indigo } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {
  useGetReportsQuery,
  useAddReportMutation,
  useDeleteReportMutation,
  useAddReportDataMutation
} from '../../services/clientsApi';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[400]),
  backgroundColor: indigo[400],
  '&:hover': {
    backgroundColor: indigo[500],
  },
}));

const ColorButtonGrey = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[500]),
  backgroundColor: blueGrey[500],
  '&:hover': {
    backgroundColor: blueGrey[600],
  },
}));

const Reports = (props) => {

  const { id, clientName } = props;
  const { data } = useGetReportsQuery(id);
  const [addReport] = useAddReportMutation();
  const [addReportData] = useAddReportDataMutation();
  const [deleteReport] = useDeleteReportMutation();
  const [expanded, setExpanded] = React.useState(false);
  const [expandedReport, setExpandedReport] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {

    if (panel.includes('panel_report')) {
      setExpandedReport(newExpanded ? panel : false);
    }
    else {
      setExpanded(newExpanded ? panel : true);
    }
  };

  const uniqueId = getUniqueNr(100, 999);

  const addReports = {
    "id": uniqueId,
    "client_id": id,
    "report1": "0",
    "report2": "0",
    "report3": "0"
  }

  const addReportHandler = async () => {
    await addReport(addReports);
  }

  const deleteReportHandler = async (event) => {
    await deleteReport(event.currentTarget.id);
  }

  const addDataHandler = async (e) => {

    const reportId = e.currentTarget.id;
    const uniqueNr = getUniqueNr(1, 100);

    const addRandomReportData = {
      "id": reportId,
      "client_id": id,
      "report1": uniqueNr,
      "report2": uniqueNr,
      "report3": uniqueNr
    }

    await addReportData(addRandomReportData);
  }

  return (
    <Accordion
      expanded={expanded === `panel${id}`}
      onChange={handleChange(`panel${id}`)}
    >
      <AccordionSummary aria-controls="panel1a-content" >
        <Typography>{clientName} #{id}</Typography>
      </AccordionSummary>
      <AccordionDetails>

        <div className='addReportBtn'>
          <ColorButton variant="contained" onClick={addReportHandler} >Add report</ColorButton>
        </div>
        {data?.map((report) => {

          return (
            <div className='clientsRowWrapper' key={report.id}>
              <div className="reportsRow">
                <div className='reportDeleteBtn'>
                  <Tooltip title="Delete">
                    <IconButton onClick={deleteReportHandler} id={report.id}>
                      <DeleteForeverIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>

                </div>
                <Accordion
                  expanded={expandedReport === `panel_report${report.id}`}
                  onChange={handleChange(`panel_report${report.id}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                  >
                    <span>Report #{report.id}</span>

                  </AccordionSummary>
                  <AccordionDetails>
                    <span>
                      <ColorButtonGrey
                        variant="contained"
                        onClick={addDataHandler}
                        id={report.id}>
                        Add data
                      </ColorButtonGrey>
                    </span>
                    <div className="progressCircle" >
                      <CircularProgressbar value={Number(report.report1)} text={`${report.report1}%`} />
                      <CircularProgressbar value={Number(report.report2)} text={`${report.report2}%`} />
                      <CircularProgressbar value={Number(report.report2)} text={`${report.report3}%`} />
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          )
        })
        }
      </AccordionDetails>
    </Accordion>
  );
};

export default Reports;

export function getUniqueNr(min, max) {

  const numberDictionary = NumberDictionary.generate({ min: min, max: max });
  const uniqueNr = uniqueNamesGenerator({ dictionaries: [numberDictionary] });

  return uniqueNr;
}
