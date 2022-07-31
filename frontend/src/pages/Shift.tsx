import React, { FunctionComponent, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { getErrorMessage } from "../helper/error/index";
import { deleteShiftById, getPublishedShift, getShiftsByDate, publishShift, copyShift,deleteShiftWeek } from "../helper/api/shift";
import DataTable from "react-data-table-component";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import EditIcon from "@material-ui/icons/Edit";
import { Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import Alert from "@material-ui/lab/Alert";
import { format } from 'date-fns';
import MyWeekPicker from "../components/MyWeekPicker";
import { getWeekRange } from "../helper/api/function";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 40,
    backgroundColor: 'white',
    color: theme.color.turquoise
  },
  copyBtn: {
    backgroundColor: theme.color.phoenix,
    color: "white",
    marginLeft: "auto",
  },
  addBtn: {
    backgroundColor: theme.color.red,
    color: "white",
    marginLeft: "auto",
  },
  clearBtn: {
    backgroundColor: theme.color.azure,
    color: "white",
    marginLeft: "auto",
  },
  publishBtn: {
    backgroundColor: theme.color.turqouise,
    color: "white",
    marginLeft: "auto",
  }
}));

const SuccessTextTypography = withStyles((theme) => ({
  root: {
    color: 'green',
    fontSize: 12
  },
}))(Typography);

interface ActionButtonProps {
  id: string;
  shouldDisable: boolean;
  onDelete: () => void;
  onEdit: (_id: string) => void;
  onCopy: () => void;
}

interface dateState {
  dateStart: Date;
  dateEnd: Date;
  params?: any
}


const ActionButton: FunctionComponent<ActionButtonProps> = ({
  id,
  shouldDisable,
  onDelete,
  onEdit,
  onCopy
}) => {
  return (
    <div>

      <IconButton
        size="small"
        aria-label="delete"
        disabled={shouldDisable}
        onClick={() => onEdit(id)}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" aria-label="delete" disabled={shouldDisable} onClick={() => onDelete()}>
        <DeleteIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" aria-label="delete" disabled={shouldDisable} onClick={() => onCopy()}>
        <FileCopyIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

const Shift = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state } = useLocation<dateState>();
  console.log(state);


  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState<boolean>(false);
  const [showCopyConfirm, setShowCopyConfirm] = useState<boolean>(false);
  const [showClearWeekConfirm, setShowClearWeekConfirm] = useState<boolean>(false);

  const [publishLoading, setPublishLoading] = useState<boolean>(false);
  const [copyLoading, setCopyLoading] = useState<boolean>(false);
  const [clearWeekLoading, setClearWeekLoading] = useState<boolean>(false);

  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [shouldCall, setShouldCall] = useState(true);
  const [shouldReload, setShouldReload] = useState(false);

  const [theLabel, setTheLabel] = useState("");
  const [publishedLabel, setPublishedLabel] = useState("");


  const onDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowDeleteConfirm(true);
  };

  const onPublishClick = () => {
    setShowPublishConfirm(true);
  };

  const onCopyWeekClick = () => {
    setShowCopyConfirm(true);
  };

  const onClearWeekClick = () => {
    setShowClearWeekConfirm(true);
  };

  const onEditClick = (id: string) => {
    history.push(`/shift/${id}/edit`, {
      dateStart: startDate,
      dateEnd: endDate
    })
  };

  const onCopyClick = (name: string, date: Date, startTime: Date, endTime: Date) => {
    history.push("/shift/add", {
      dateStart: startDate,
      dateEnd: endDate,
      params: {
        name: name, date: date, startTime: startTime, endTime: endTime
      }
    })
  };

  const onCloseDeleteDialog = () => {
    setSelectedId(null);
    setShowDeleteConfirm(false);
  };

  const onClosePublishDialog = () => {
    setShowPublishConfirm(false);
  };

  const onCloseCopyDialog = () => {
    setShowCopyConfirm(false);
  };

  const onCloseClearWeekDialog = () => {
    setShowClearWeekConfirm(false);
  };

  useEffect(() => {
    const getData = async () => {

      if (state && shouldCall) {
        setStartDate(state?.dateStart);
        setEndDate(state?.dateEnd);
        setShouldCall(false);
      }
      try {
        setIsLoading(true);
        setErrMsg("");
        setTheLabel(format(startDate, 'd MMM') + " - " + format(endDate, "d MMM"));

        const { results } = await getShiftsByDate(format(startDate, 'yyyy-MM-dd'), format(endDate, "yyyy-MM-dd"));
        let publishPayload = {
          dateStart: format(startDate, 'yyyy-MM-dd'),
          dateEnd: format(endDate, "yyyy-MM-dd")
        }
        const published = await getPublishedShift(publishPayload);
        setRows(results);
        if (published.results.length > 0) {
          setIsPublished(true);
          setPublishedLabel("✓ Week Published on " + format(new Date(published.results[0].createdAt), 'd MMM yyyy, hh:mm aa'))
        }
        else {
          setIsPublished(false);
          setPublishedLabel("");
        }

      } catch (error) {
        const message = getErrorMessage(error);
        setErrMsg(message);
      } finally {
        setIsLoading(false);
        setShouldReload(false);
      }
    };


    getData();
  }, [startDate, endDate, isPublished, shouldReload]);

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Start Time",
      selector: "startTime",
      sortable: true,
    },
    {
      name: "End Time",
      selector: "endTime",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <ActionButton id={row.id} shouldDisable={isPublished} onDelete={() => onDeleteClick(row.id)} onEdit={() => onEditClick(row.id)} onCopy={() => onCopyClick(row.name, row.date, row.startTime, row.endTime)} />
      ),
    },
  ];

  const deleteDataById = async () => {
    try {
      setDeleteLoading(true);
      setErrMsg("");

      if (selectedId === null) {
        throw new Error("ID is null");
      }


      await deleteShiftById(selectedId);

      const tempRows = [...rows];
      const idx = tempRows.findIndex((v: any) => v.id === selectedId);
      tempRows.splice(idx, 1);
      setRows(tempRows);
    } catch (error) {
      const message = getErrorMessage(error);
      setErrMsg(message);
    } finally {
      setDeleteLoading(false);
      onCloseDeleteDialog();
    }
  };

  const publishWeek = async () => {
    try {
      setPublishLoading(true);
      setErrMsg("");

      let _payload = {
        dateStart: startDate,
        dateEnd: endDate
      }
      await publishShift(_payload);

      setIsPublished(true);
    } catch (error) {
      const message = getErrorMessage(error);
      setErrMsg(message);
    } finally {
      setPublishLoading(false);
      onClosePublishDialog();
    }
  };

  const copyWeek = async () => {
    try {
      setCopyLoading(true);
      setErrMsg("");

      let _payload = {
        dateStart: startDate,
        dateEnd: endDate
      }
      await copyShift(_payload);
      setShouldReload(true);

    } catch (error) {
      const message = getErrorMessage(error);
      setErrMsg(message);
    } finally {
      setCopyLoading(false);
      onCloseCopyDialog();
    }
  };

  const clearWeek = async () => {
    try {
      setClearWeekLoading(true);
      setErrMsg("");

      let _payload = {
        dateStart: startDate,
        dateEnd: endDate
      }
      await deleteShiftWeek(_payload);
      setShouldReload(true);
    } catch (error) {
      const message = getErrorMessage(error);
      setErrMsg(message);
    } finally {
      setClearWeekLoading(false);
      onCloseClearWeekDialog();
    }
  };


  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item xs={3}>
              <MyWeekPicker
                startChange={setStartDate}
                endChange={setEndDate}
                weekLabel={theLabel}
                isPublished={isPublished}
              ></MyWeekPicker>
            </Grid>
            <Grid item xs={4}>
              <SuccessTextTypography align="right">{publishedLabel}</SuccessTextTypography>
            </Grid>
            <Grid item xs={5}>
              <Button
                variant="contained"
                size="small"
                className={classes.copyBtn}
                color="primary"
                aria-label="copy"
                onClick={() => onCopyWeekClick()}>
                Copy Week
              </Button>
              <Button variant="contained"
                className={classes.addBtn}
                size="small"
                color="primary"
                aria-label="add"
                disabled={isPublished}
                onClick={() => history.push("/shift/add", {
                  dateStart: startDate,
                  dateEnd: endDate
                })}>
                Add Shift
              </Button>
              <Button variant="contained"
              className={classes.clearBtn}
                size="small"
                color="primary"
                aria-label="delete"
                disabled={isPublished}
                onClick={() => onClearWeekClick()}
                >
                Clear Week
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.publishBtn}
                color="primary"
                aria-label="publish"
                disabled={isPublished}
                onClick={() => onPublishClick()}>
                Publish Now!
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>


              {errMsg.length > 0 ? (
                <Alert severity="error">{errMsg}</Alert>
              ) : (
                <></>
              )}
              <DataTable
                title="Shifts"
                columns={columns}
                data={rows}
                pagination
                progressPending={isLoading}
              />

            </Grid>

            <ConfirmDialog
              title="Delete Confirmation"
              description={`Do you want to delete this data ?`}
              onClose={onCloseDeleteDialog}
              open={showDeleteConfirm}
              onYes={deleteDataById}
              loading={deleteLoading}
            />

            <ConfirmDialog
              title="Publish Confirmation"
              description={`Do you want to publish this week ?`}
              onClose={onClosePublishDialog}
              open={showPublishConfirm}
              onYes={publishWeek}
              loading={publishLoading}
            />

            <ConfirmDialog
              title="Copy Weeks"
              description={`Do you want to copy this week shift to next week? Clashed schedule won't be copied and this copy won't work if next week already published`}
              onClose={onCloseCopyDialog}
              open={showCopyConfirm}
              onYes={copyWeek}
              loading={copyLoading}
            />

            <ConfirmDialog
              title="Clear Weeks"
              description={`Do you want to clear this week shift to next week?`}
              onClose={onCloseClearWeekDialog}
              open={showClearWeekConfirm}
              onYes={clearWeek}
              loading={clearWeekLoading}
            />
          </Grid >
        </CardContent>
      </Card>
    </div >

  );
};

export default Shift;
