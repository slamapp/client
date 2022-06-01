import type { ReactNode } from "react";
import {
  AuthProvider,
  NavigationProvider,
  SocketProvider,
  MapProvider,
  ReservationProvider,
} from ".";
import AnalyticsProvider from "./AnalyticsProvider";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <AuthProvider>
      <SocketProvider>
        <NavigationProvider>
          <ReservationProvider>
            <MapProvider>
              <AnalyticsProvider>{children}</AnalyticsProvider>
            </MapProvider>
          </ReservationProvider>
        </NavigationProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

export default Providers;
