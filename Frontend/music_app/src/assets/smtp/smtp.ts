type EmailOptions = {
  nocache?: number;
  Action?: string;
  Host: string;
  Username: string;
  Password: string;
  Port: number;
  To: string;
  From: string;
  Name?: string;
  Subject: string;
  Body: string;
};

class EmailService {
  /**
   * Sends an email using the provided options.
   * @param options - The email options to be used for sending the email.
   * @returns A promise that resolves with the server's response.
   */
  static send(options: EmailOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      options.nocache = Math.floor(1e6 * Math.random() + 1);
      options.Action = "Send";

      const payload = JSON.stringify(options);

      EmailService.ajaxPost(
        "https://smtpjs.com/v3/smtpjs.aspx?",
        payload,
        (response) => {
          resolve(response);
        }
      );
    });
  }

  /**
   * Sends an HTTP POST request to the specified URL with the provided payload.
   * @param url - The URL to send the POST request to.
   * @param payload - The payload to send in the POST request.
   * @param callback - A callback function to handle the response.
   */
  private static ajaxPost(url: string, payload: string, callback: (response: string) => void): void {
    const xhr = EmailService.createCORSRequest("POST", url);
    if (xhr) {
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onload = function () {
        const response = xhr.responseText;
        if (callback) {
          callback(response);
        }
      };
      xhr.send(payload);
    } else {
      console.error("CORS not supported");
    }
  }

  /**
   * Sends an HTTP GET request to the specified URL.
   * @param url - The URL to send the GET request to.
   * @param callback - A callback function to handle the response.
   */
  static ajax(url: string, callback: (response: string) => void): void {
    const xhr = EmailService.createCORSRequest("GET", url);
    if (xhr) {
      xhr.onload = function () {
        const response = xhr.responseText;
        if (callback) {
          callback(response);
        }
      };
      xhr.send();
    } else {
      console.error("CORS not supported");
    }
  }

  /**
   * Creates a CORS-enabled XMLHttpRequest.
   * @param method - The HTTP method to use (e.g., "GET" or "POST").
   * @param url - The URL to send the request to.
   * @returns An XMLHttpRequest object configured for CORS, or null if unsupported.
   */
  private static createCORSRequest(method: string, url: string): XMLHttpRequest | null {
    const xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      xhr.open(method, url, true);
      return xhr;
    } else {
      console.error("CORS not supported");
      return null;
    }
  }
}

export default EmailService;
