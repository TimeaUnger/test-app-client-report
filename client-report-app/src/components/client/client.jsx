import './client.css';
import Reports from "../reports/reports";
import { useDeleteClientMutation, useClientsQuery } from '../../services/clientsApi';
import { useSearchParams } from "react-router-dom";
import Button from '@mui/material/Button';
import { indigo } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import CircularColor from '../uiComponents/loadinPage';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[400]),
  backgroundColor: indigo[400],
  '&:hover': {
    backgroundColor: indigo[500],
  },
}));


const Client = () => {

  const [searchParams] = useSearchParams();
  const querySearchVal = searchParams.get("name");
  const navigate = useNavigate();

  const searchQuery = querySearchVal !== null ? `?name=${querySearchVal}` : '';

  const { data, isLoading, isSuccess } = useClientsQuery(searchQuery);
  const [deleteClient] = useDeleteClientMutation();

  const deleteClientHandler = async (event) => {
    await deleteClient(event.currentTarget.id);
  }

  const handleListAllClients = () => {
    navigate("/");
  };

  return (
    <div className="reportsContent">

      {isLoading ?
        <CircularColor />
        : isSuccess && data.length !== 0 ?
          data.map(client => {

            return (
              <div className="" key={client.id}>
                <div className="clientReportMainBtn">
                  <Tooltip title="Delete">
                    <IconButton  onClick={deleteClientHandler}  id={client.id}>
                      <DeleteForeverIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="clientReportMenu">
                  <Reports id={client.id} clientName={client.name} />
                </div>
              </div>
            )
          })
          :
          <div className="noResult">
            <div className="noResultInner">
              <div className="noResultTitle">
                <h3>No exact matches found.</h3>
                Please check the spelling
              </div>
              <ColorButton variant="contained" endIcon={<SendIcon />} onClick={handleListAllClients}>List all clients</ColorButton>

            </div>
          </div>
      }
    </div>
  );
}

export default Client;