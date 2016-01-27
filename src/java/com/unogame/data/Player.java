package com.unogame.data;


import java.io.Serializable;
import java.util.HashMap;
import javax.enterprise.context.SessionScoped;
import javax.inject.Named;

@Named
@SessionScoped
public class Player implements Serializable {
    
    private static final long serialVersionUID = 1L;

    private String PlayerId;
    private String PlayerPic;
    private HashMap<Card, Boolean> HandCards;
    private HashMap<String, Integer> RoundScore;

    public Player(String PlayerId, String PlayerPic) {
        this.PlayerId = PlayerId;
        this.PlayerPic = PlayerPic;
        this.HandCards = new HashMap<>();
        this.RoundScore = new HashMap<>();
    }

    public Player() {
        this.PlayerId = "";
        this.PlayerPic = "";
        this.HandCards = new HashMap<>();
        this.RoundScore = new HashMap<>();
    }

    public Player(String playerId) {
        this.PlayerId = playerId;
        this.PlayerPic = "";
        this.HandCards = new HashMap<>();
        this.RoundScore = new HashMap<>();
        ; //To change body of generated methods, choose Tools | Templates.
    }

    public void setPlayerId(String PlayerId) {
        this.PlayerId = PlayerId;
    }

    public void setPlayerPic(String PlayerPic) {
        this.PlayerPic = PlayerPic;
    }

    public String getPlayerId() {
        return this.PlayerId;
    }

    public String getPlayerPic() {
        return PlayerPic;
    }

    public HashMap<Card, Boolean> getHandCards() {
        return HandCards;
    }

    public void addCard(Card c) {
        HandCards.put(c, Boolean.TRUE);
    }

    public Card putOne(Card c) {
        this.HandCards.remove(c);
        return c;
    }

    public int calculateHandCardScore() {
        int score = 0;
        for (Card cd : HandCards.keySet()) {
            score += cd.getPoint();
        }
        return score;
    }
    
    public void clearHandCard(){
        HandCards.clear();
    }
    
    public int getTotalCard(){
        return this.HandCards.size();
    }
    
    public void addScore(String round, int score){
        RoundScore.put(round, score);
    }

    @Override
    public String toString() {
        String st = "Player Id : " + this.PlayerId
                + "; Planer Name : " + this.PlayerPic
                + "; Card : ";
        for (Card cd : HandCards.keySet()) {
            st += cd.getCardId() + " ";
        }
        return st;
    }


    
    public void Uno(Player p) {
        //???? Let think this one later
    }

    public void Uno() {
        //???? Let think this one later
    }

    public Player copy() {
        Player p = new Player();
        p.PlayerId = PlayerId;
        p.PlayerPic = PlayerPic;
        p.HandCards = HandCards;
        p.RoundScore = RoundScore;
        return p;
    }
}
