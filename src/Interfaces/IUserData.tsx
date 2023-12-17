export interface IUserDataProvider {
  obsServerAddress: string;
  handleServerAddress(data: string);
  obsServerPort: number;
  handleServerPort(data: number);
  obsServerPassword: string;
  handleServerPassword(data: string);
}
