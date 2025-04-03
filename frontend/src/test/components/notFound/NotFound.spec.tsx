import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router";
import PageNotFound from "../../../components/pageNotFound/PageNotFound";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("Given NoFound Page", () => {

  describe("when visit any random page", () => {
    it("should render", () => {
      render(<PageNotFound />);
      const txt = screen.getByText("Page not found");
      expect(txt).toBeInTheDocument();
    });

    it('should navigate to path "/" route', () => {
      const navigate = useNavigate();
      render(<PageNotFound />);
      const button = screen.getByRole("button", { name: /go home/i });
      button.click();
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });
});
