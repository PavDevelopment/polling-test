import { IOptions } from "rx-polling";

export interface IPollProcessor<T> {
  processPollRequest(pollResponse: T): {notification: string, isSuccess: boolean };
}

export interface IPollConfig {
  id: string;
  pollDelay: number;
  attemptsMade: number;
  pollStartDate: number;
  maxPollAttempts: number;
  pollUrl: string;
  isPollRunning: boolean;
  pollSuccessCondition: IPollProcessor<any>;
  pollOptions: IOptions;
  pollHeaders: any;
  pollRequest$: any;
  pollResponse: any | null;
  logPoll: boolean;
}

export interface IJokeResponse {
  joke: string;
}
