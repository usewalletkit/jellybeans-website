import { Address, Hex } from "viem";
import { z } from "zod";

// URL PARAMS

export const numSchema = z.coerce.number().positive();
export type NumType = z.infer<typeof numSchema>;

/**
 * --- DATA ---
 */

// LATEST ROUND

export type RawLatestRoundData = {
  rounds: {
    items: [
      {
        id: string; // -> number
      },
    ];
  };
};

export type LatestRound = {
  id: number;
};

// ROUND

export type RawRoundData = {
  round: {
    id: string; // -> number
    question: string;
    submissionDeadline: string; // -> bigint
    potAmount: string; // -> bigint
    decimals: number;
    numWinners: number;
    feeAmount: string; // -> bigint
    initRoundTxnHash: Hex;
    submissionCount: number;
    isFinalized: boolean;
    correctAnswer: string; // -> bigint
    winningAnswer: string; // -> bigint
    winners: Hex[];
    setCorrectAnswerTxnHash: Hex;
  };
};

export type RoundData = ActiveRoundData | PastRoundData;

export type ActiveRoundData = {
  roundState: "active";
  id: number;
  question: string;
  payoutDetails?: string;
  hint?: string;
  submissionDeadline: bigint;
  potAmount: bigint;
  decimals: number;
  numWinners: number;
  feeAmount: bigint;
  initRoundTxnHash: Hex;
  submissionCount: number;
  isFinalized: false;
  correctAnswer: null;
  winningAnswer: null;
  winners: null;
  setCorrectAnswerTxnHash: null;
};

export type PastRoundData = {
  roundState: "past";
  id: number;
  question: string;
  payoutDetails?: string;
  hint?: string;
  submissionDeadline: bigint;
  potAmount: bigint;
  decimals: number;
  numWinners: number;
  feeAmount: bigint;
  initRoundTxnHash: Hex;
  submissionCount: number;
  isFinalized: true;
  correctAnswer: bigint;
  winningAnswer: bigint;
  winners: Address[];
  setCorrectAnswerTxnHash: Hex;
};

// SUBMISSIONS

export type RawSubmissionsData = {
  submissions: {
    items: {
      entry: string; // -> bigint
      round: string; // -> number
      submitter: Address;
      txnHash: Hex;
      timestamp: string; // -> bigint
    }[];
  };
};
