import httpMocks from 'node-mocks-http';
import monitoringController from '../../src/controllers/monitoringController';

describe("Test case for monitoring controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("1 - getMonitoring", () => {
        it("1 - should return pong and code 200", async () => {
            const req = httpMocks.createRequest({
                method: 'GET'
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await monitoringController.getMonitoring(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});