package ShareMarket.sharemarket.exception;

import ShareMarket.sharemarket.model.DefaultRes;
import ShareMarket.sharemarket.model.HttpResponseMessage;
import ShareMarket.sharemarket.model.HttpStatusCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(PostNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleException(PostNotFoundException ex) {
        ApiErrorResponse apiErrorResponse = new ApiErrorResponse(
                "error-0001",
                "No Post is found with ID :" + ex.getId()
        );
        return new ResponseEntity<>(apiErrorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<DefaultRes> handleException(FileNotFoundException ex) {
        return new ResponseEntity<>(
                DefaultRes.response(HttpStatusCode.NOT_FOUND,
                        HttpResponseMessage.FILE_NOT_FOUND + " : " + ex.getId()), HttpStatus.NOT_FOUND);

    }

    @ExceptionHandler(ChatRoomExistException.class)
    public ResponseEntity<DefaultRes> handleException(ChatRoomExistException ex) {
        return new ResponseEntity<>(
                DefaultRes.response(HttpStatusCode.BAD_REQUEST,
                        HttpResponseMessage.ROOM_ALREADY_EXIST, ex.getRoomResponseDto()), HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler(DefaultException.class)
    public ResponseEntity<DefaultRes> handleException(DefaultException ex) {
        return new ResponseEntity<>(
                DefaultRes.response(HttpStatusCode.BAD_REQUEST,
                        ex.getMessage()), HttpStatus.BAD_REQUEST
        );
    }

}
