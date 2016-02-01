package com.unogame.biz;

import com.unogame.model.Groups;
import com.unogame.model.Hashgenerator;
import com.unogame.model.User;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class UserManager {

    @PersistenceContext
    private EntityManager em;
    
    
    public User getByName(String id){
        System.out.println("I will try to get the user");
        User user = em.find(User.class, id);
        System.out.println(user);
        return user;
    }
    public String getPicture(String id){
        User user = em.find(User.class, id);
        return user.getPicture();
    }

    public Boolean Login(String id, String password) {
        
        Boolean IsUserCorrect = false;
        User loginUser = em.find(User.class, id);
        
        
        if (null != loginUser) {
            Hashgenerator hashg = new Hashgenerator();
            String hashpassowrd = hashg.generateHash(password);
            if (loginUser.getPassword().equals(hashpassowrd)) {
                IsUserCorrect = true;
            }
        }
        return IsUserCorrect;
    }
    
    public void create(String id, String pwd, String email, String picture, String groupid){
        
        Groups groups= em.find(Groups.class, groupid);
        User ur = new User();
        ur.setUserId(id);
        ur.setPassword(pwd);
        ur.setEmail(email);
        ur.setPicture(picture);
        em.persist(ur);
        groups.getUserCollection().add(ur);
    }
    
}
