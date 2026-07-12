import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { RecordCard } from "../app/components/RecordCard";
import { Sidebar } from "../app/components/Sidebar";
import type { ArchiveRecord } from "../app/archive-data";
import { REQUIRED_IDS, BOARD_EVIDENCE } from "../app/archive-data";

describe("React Components", () => {
  describe("RecordCard", () => {
    const mockRecord: ArchiveRecord = {
      id: "TEST-ID",
      title: "テスト資料タイトル",
      body: "テスト用本文データがここにあります。",
      branch: "weather",
      level: 1,
      kind: "気象観測",
      date: "平成10年8月17日",
      evidence: "検証用証拠",
    };

    it("renders record details correctly", () => {
      render(<RecordCard record={mockRecord} />);

      expect(screen.getByText("テスト資料タイトル")).toBeInTheDocument();
      expect(screen.getByText("TEST-ID")).toBeInTheDocument();
      expect(screen.getByText("テスト用本文データがここにあります。")).toBeInTheDocument();
      expect(screen.getByText("LEVEL 1")).toBeInTheDocument();
      expect(screen.getByText("検証用証拠")).toBeInTheDocument();
    });
  });

  describe("Sidebar", () => {
    const mockProps = {
      progress: 50,
      requiredFound: 5,
      boardEvidenceFound: 2,
      boardReady: false,
      caseSolved: false,
      branchProgress: [
        { branch: "weather" as const, found: 2, total: 4 },
        { branch: "people" as const, found: 1, total: 3 },
      ],
      onOpenNotebook: vi.fn(),
      onOpenGuide: vi.fn(),
    };

    it("renders progress and evidence count", () => {
      render(<Sidebar {...mockProps} />);

      expect(screen.getByText("50%")).toBeInTheDocument();

      const expectedRequiredText = `${mockProps.requiredFound} / ${REQUIRED_IDS.length} 件`;
      expect(screen.getByText(expectedRequiredText)).toBeInTheDocument();

      const expectedBoardText = `横断証拠 ${mockProps.boardEvidenceFound} / ${BOARD_EVIDENCE.length}`;
      expect(screen.getByText(expectedBoardText)).toBeInTheDocument();
    });
  });
});
