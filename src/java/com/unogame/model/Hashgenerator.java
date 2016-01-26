package com.unogame.model;


import com.google.common.base.Charsets;
import com.google.common.hash.Hashing;
import java.nio.charset.Charset;
import javax.ejb.Singleton;
import javax.ejb.Stateless;


public class Hashgenerator {
    
    public String  generateHash(String password){
        
        String output = Hashing.sha256()
                .hashString(password, Charsets.UTF_8).toString();
        
        return output;
    }
    
}
