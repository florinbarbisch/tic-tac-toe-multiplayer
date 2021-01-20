export default class ErrorHandler {
  constructor(snackBar) {
    this.snackBar = snackBar;
  }

  onErrorResponse(error) {
    console.log(error);
    if (
      error &&
      error.response &&
      error.response.status &&
      error.response.data.errors
    ) {
      const errors = error.response.data.errors;
      this.snackBar.danger({
        text:
          Object.keys(errors)[0] +
          Object.values(errors)[0] +
          ". Status code: " +
          error.response.status
      });
    } else if (error && error.data) {
      const errors = error.data;
      this.snackBar.danger({
        text:
          Object.keys(errors)[0] +
          " " +
          Object.values(errors)[0] +
          ". Status code: " +
          error.status
      });
    } else if (error && error.response && error.response.status) {
      this.snackBar.danger({
        text: "Something went wrong. Status code: " + error.response.status
      });
    } else {
      this.snackBar.danger({
        text: "Something went wrong."
      });
    }
  }
}
