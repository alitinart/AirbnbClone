package com.alitinart.airbnb;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Response {

    public String message;
    public String error;
    public Number status;
    public Object data;
}
