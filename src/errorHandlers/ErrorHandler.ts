import { NextResponse } from "next/server";
import { AppError } from "./AppError";

export function ErrorHandler(error: any) {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: error.statusCode,
      }
    );
  }

  console.log("Unhandled error" , error);
  return NextResponse.json(
    {error: "Internal server error"},
    {status: 500}
  )
}
