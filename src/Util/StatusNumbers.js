export const STATUS_NUMBERS = {
  NOT_STARTED: 1,
  IN_PROGRESS: 2,
  COMPLETE: 3,
};

export const getStatusClassName = (status) => {
  if (status === 3) {
    return "Completed";
  } else if (status === 2) {
    return "inProgress";
  } else {
    return "notStarted";
  }
};
