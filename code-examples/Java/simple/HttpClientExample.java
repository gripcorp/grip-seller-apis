package show.grip.apidemo;

import org.apache.commons.codec.binary.Base64;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;


public class HttpClientExample {
    final private static String accessKey = "Your Access Key";
    final private static String secretKey = "Your Secret Key";
    final private static String serviceId = "Your Service ID";
    final private static String apiHost = "https://seller.grip.show";

    public static void main(String[] args) {
        final String apiPath = "/api/product/category";
        try {
            HttpClientExample httpClientExample = new HttpClientExample();
            final long timestamp = System.currentTimeMillis();
            final String fingerprint = httpClientExample.generateFingerprint("GET", apiPath, timestamp);
            HttpResponse<String> response = httpClientExample.sendHttpRequest(fingerprint, apiPath, timestamp);
            System.out.println(response.body());
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    private HttpResponse<String> sendHttpRequest(final String fingerprint, final String apiPath, final long timestamp) throws Exception {
        try {
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .header("X-ServiceId", serviceId)
                .header("X-AccessKey", accessKey)
                .header("X-Fingerprint", fingerprint)
                .header("X-Fingerprint-Timestamp", String.valueOf(timestamp))
                .uri(new URI(apiHost + apiPath))
                .build();
            return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (Exception ex) {
            throw ex;
        }
    }

    private String generateFingerprint(final String method, final String apiPath, final long timestamp) throws Exception {
        try {
            String message = new StringBuilder()
                    .append(method)
                    .append(" ")
                    .append(apiPath)
                    .append("\n")
                    .append(timestamp)
                    .append("\n")
                    .append(accessKey)
                    .toString();
            SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HHmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(signingKey);
            byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
            String encodeBase64String = Base64.encodeBase64String(rawHmac);
            return encodeBase64String;
        } catch (Exception ex) {
            throw ex;
        }
    }
}

