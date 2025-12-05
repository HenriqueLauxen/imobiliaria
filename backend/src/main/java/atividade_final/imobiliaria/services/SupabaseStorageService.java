package atividade_final.imobiliaria.services;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
public class SupabaseStorageService {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.key}")
    private String supabaseKey;

    @Value("${supabase.bucket}")
    private String bucketName;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Faz upload de um arquivo para o Supabase Storage
     * @param file arquivo a ser enviado
     * @param folder pasta dentro do bucket (ex: "imovel_1")
     * @return URL pública do arquivo
     */
    public String uploadFile(MultipartFile file, String folder) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String fileName = UUID.randomUUID().toString() + extension;
        String filePath = folder + "/" + fileName;
        String uploadUrl = supabaseUrl + "/storage/v1/object/" + bucketName + "/" + filePath;
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + supabaseKey);
        headers.set("apikey", supabaseKey);
        String contentType = file.getContentType();
        if (contentType != null) {
            headers.setContentType(MediaType.parseMediaType(contentType));
        } else {
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        }

        HttpEntity<byte[]> requestEntity = new HttpEntity<>(file.getBytes(), headers);
        
        try {
            ResponseEntity<String> response = restTemplate.exchange(uploadUrl, HttpMethod.POST, requestEntity, String.class);
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new IOException("Erro no upload para Supabase: " + response.getBody());
            }
        } catch (Exception e) {
            throw new IOException("Erro ao fazer upload para Supabase: " + e.getMessage(), e);
        }
        
        return supabaseUrl + "/storage/v1/object/public/" + bucketName + "/" + filePath;
    }

    /**
     * Deleta um arquivo do Supabase Storage
     * @param fileUrl URL completa do arquivo
     */
    public void deleteFile(String fileUrl) {
        if (fileUrl == null || fileUrl.isEmpty()) {
            return;
        }
        
        String basePath = supabaseUrl + "/storage/v1/object/public/" + bucketName + "/";
        if (!fileUrl.startsWith(basePath)) {
            return;
        }
        
        String filePath = fileUrl.substring(basePath.length());
        String deleteUrl = supabaseUrl + "/storage/v1/object/" + bucketName + "/" + filePath;
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + supabaseKey);
        headers.set("apikey", supabaseKey);
        
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
        try {
            restTemplate.exchange(deleteUrl, HttpMethod.DELETE, requestEntity, String.class);
        } catch (Exception e) {
            System.err.println("Erro ao deletar arquivo: " + e.getMessage());
        }
    }
}
