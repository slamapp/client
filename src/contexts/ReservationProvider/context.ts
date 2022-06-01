import { createContext } from "react";

interface ContextProps {
  reservation: any;
  handleInitReservation: any;
  handleSetCurrentBlock: any;
  handleStartCreate: any;
  handleStartUpdate: any;
  handleDecreaseStep: any;
  handleCreateReservation: any;
  handleUpdateReservation: any;
  handleDeleteReservation: any;
  handleChangeHasBall: any;
  handleSelectReservation: any;
  handleSetCurrentInput: any;
  handleSetTime: any;
}

const ReservationContext = createContext<ContextProps>({} as ContextProps);

export default ReservationContext;
