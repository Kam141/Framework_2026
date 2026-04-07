import { jest, describe, it, expect, beforeEach } from "@jest/globals";
// src/__test__/pages/product.spec.tsx
import { render, screen } from "@testing-library/react"

const mockedUseRouter = jest.fn()

jest.mock("next/router", () => ({
    useRouter: mockedUseRouter,
}))

import TampilanProduk from "@/pages/produk"

describe("Product Page", () => {
    beforeEach(() => {
        mockedUseRouter.mockReturnValue({
            route: "/produk",
            pathname: "/produk",
            query: {},
            asPath: "/produk",
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
            },
            isReady: true,
        })
    })

    it("renders product page correctly", () => {
        const page = render(<TampilanProduk />)
        expect(screen.getByText("Daftar Produk").textContent).toBe("Daftar Produk")
        expect(page).toMatchSnapshot()
    })
})