import { useFrappeGetCall, useFrappePostCall } from "frappe-react-sdk";
import { useState, useEffect } from "react";
import { FRAPPE_APIS } from "./api.config";
import { HRUserInfo } from "../types/variables";

type HRTicketsCount = {
  total_ticket_count: number;
  happy_run_count: number;
  well_being_count: number;
  limit_ticket_count: number;
  allow_buy_ticket: boolean;
};

const useCheckTicketsCount = () => {
  const { call } = useFrappePostCall<{ message: HRTicketsCount }>(
    FRAPPE_APIS.CHECK_TICKETS.METHOD_STRING
  );

  return { call };
};

export default useCheckTicketsCount;
