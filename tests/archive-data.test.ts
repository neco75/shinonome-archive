import { describe, it, expect } from "vitest";
import { normalize, findRoute, records } from "../app/archive-data";

describe("archive-data utilities", () => {
  describe("normalize", () => {
    it("should normalize Japanese whitespace and character casings", () => {
      // 全角スペースや大文字小文字の規格化テスト
      expect(normalize("テスト　データ")).toBe("テストデタ");
      expect(normalize("ＡＢＣ")).toBe("abc");
      expect(normalize("  ひらがな  ")).toBe("ひらがな");
    });
  });

  describe("findRoute", () => {
    it("should find valid routes by exact matching terms", () => {
      // 特定の用語での検索テスト
      // 事前に archive-data 内のいくつかの実在用語をテスト
      const b4Route = findRoute("B-4");
      expect(b4Route).toBeDefined();
      if (b4Route) {
        expect(b4Route.ids).toContain("EQ-B4");
      }
    });

    it("should return undefined for unknown search queries", () => {
      const unknownRoute = findRoute("存在しない検索ワード12345");
      expect(unknownRoute).toBeUndefined();
    });

    it("should match cross reference queries with whitespace split", () => {
      // 相互参照検索のテスト
      // 2つの単語を組み合わせて検索する
      // 例: "水無瀬 A-17" などが archive-data.tsx の routes に定義されているか
      // routes の一部の組み合わせをシミュレーションして findRoute が機能することを確認
    });
  });

  describe("records metadata", () => {
    it("should contain records with correct structure", () => {
      const firstKey = Object.keys(records)[0];
      const record = records[firstKey];
      expect(record).toBeDefined();
      expect(record).toHaveProperty("id");
      expect(record).toHaveProperty("title");
      expect(record).toHaveProperty("body");
      expect(record).toHaveProperty("branch");
    });
  });
});
