import request from "supertest";
import app from "../src";

describe('Express App', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
  describe("/hello",()=>{
    it("should return 'Hello World'",(done)=>{
      request(app)
      .get('/hello')
      .expect(200)
      .expect('Hello World!',done)
    })
  })
});
