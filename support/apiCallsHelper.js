// Helper functions for different types of requests
const supertest = require('supertest');
const logger = require('logger').createLogger();

async function sendGETRequest(apiEndPoint) {
  try {
    const res = await supertest(apiEndPoint)
      .get('')
      .retry(2)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    return res;
  } catch (err) {
    logger.error('Error in sending GET Request: ', err);
    return err;
  }
}

async function sendPOSTRequest(baseUrl, apiEndPoint, requestBody, contentType) {
  try {
    const res = await supertest(baseUrl)
      .post(apiEndPoint)
      .retry(2)
      .set('Accept', contentType)
      .set('Content-Type', contentType)
      .send(requestBody);
    return res;
  } catch (err) {
    logger.info('Error in sending POST Request: ', err);
    return err;
  }
}

async function sendPOSTRequestAuth(baseUrl, apiEndPoint, requestBody, authentication) {
  try {
    const res = await supertest(baseUrl)
      .post(apiEndPoint)
      .retry(2)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authentication}`)
      .send(requestBody);
    return res;
  } catch (err) {
    logger.info('Error in sending POST Request: ', err);
    return err;
  }
}

async function sendPOSTRequestWithCookie(baseUrl, apiEndPoint, requestBody, contentType, token) {
  try {
    const res = await supertest(baseUrl)
      .post(apiEndPoint)
      .retry(2)
      .set('Accept', contentType)
      .set('Content-Type', contentType)
      .set('Cookie', `token=${token}`)
      .send(requestBody);
    return res;
  } catch (err) {
    logger.info('Error in sending POST Request: ', err);
    return err;
  }
}

async function sendDELETERequestWithCookie(baseUrl, apiEndPoint, contentType, token) {
  try {
    const res = await supertest(baseUrl)
      .delete(apiEndPoint)
      .retry(2)
      .set('Accept', contentType)
      .set('Content-Type', contentType)
      .set('Cookie', `token=${token}`);
    return res;
  } catch (err) {
    logger.error('Error in sending DELETE Request: ', err);
    return null;
  }
}

module.exports = {
  sendGETRequest,
  sendPOSTRequest,
  sendPOSTRequestAuth,
  sendPOSTRequestWithCookie,
  sendDELETERequestWithCookie,
};
