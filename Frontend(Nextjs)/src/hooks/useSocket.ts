
import { useContext } from "react";
import {SocketContext} from '../context/SocketContext'

export const useSocketio = () => useContext(SocketContext);

