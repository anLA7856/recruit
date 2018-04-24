package com.jun.utils;

import org.springframework.core.io.Resource;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
/**
 * 用来上传文件的，主要是上传头像
 * @author jun
 *
 */
public class IoUtils {
    private static final int DEFAULT_BUFFER_SIZE = 1024;

    protected IoUtils() {
    }

    public static String readString(Resource resource) throws IOException {
        return readString(resource.getInputStream());
    }

    public static String readString(InputStream is) throws IOException {
        return readString(is, "UTF-8");
    }

    public static String readString(InputStream is, String encoding)
            throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        copyStream(is, baos);

        String text = new String(baos.toByteArray(), encoding);

        return text;
    }
/**
 * 把文件作为响应流传给网页
 * @param fileLocation
 * @param os
 * @throws IOException
 */
    public static void copyFileToOutputStream(String fileLocation,
            OutputStream os) throws IOException {
        FileInputStream fis = new FileInputStream(fileLocation);
        copyStream(fis, os);
    }

    public static void copyStream(InputStream is, OutputStream os)
            throws IOException {
        if (is == null) {
            throw new IllegalArgumentException("InputStream is null");
        }

        if (os == null) {
            throw new IllegalArgumentException("OutputStream is null");
        }

        byte[] b = new byte[DEFAULT_BUFFER_SIZE];
        int len = 0;

        try {
            while ((len = is.read(b, 0, DEFAULT_BUFFER_SIZE)) != -1) {
                os.write(b, 0, len);
            }
        } finally {
            is.close();
            os.flush();
        }
    }
}
