package com.unogame.data;

/*
* Owner : Uno Game First Team
* General Description of this Class : 
* - this class is the representative of a game
*
* Version Control :
* 1. 13/01/2015; Akwila; Create Game Class
* 
 */

import com.unogame.data.Player;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Set;
import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import javax.inject.Named;
import com.unogame.gamerule.Round;

@Named("game")
@SessionScoped
public class Game implements Serializable {

    @Inject
    private CardDeck cdeck;

    private static final long serialVersionUID = 1L;

    private String GameId;
    private ArrayList<String> PlayerId;
    private HashMap<String, Player> PlayerList;
    private HashMap<String, Integer> ScoreList;
    private HashMap<String, Integer> TotalCardList;
    private ArrayList<Round> RoundList;
    private Boolean openGame;
    /*
    * openGame True : someone can join
    * openGame False : no one can join
     */
    private Card LastCard;
    private String CurrentPlayer;
    private Boolean TurnPattern;

    private int roundLimit;
    private int maxPlayer;

    /*
    * roundLimit = 0, that means we use score as limit
    * scoreLimit = 0, that means we use round as limit
    * if we use round as limit, minimum limit is 1
    * if we use score as limit, minumum score is 10
     */
    public Game(String GameId, int roundLimit, int maxPlayer) {
        this.GameId = GameId;
        this.PlayerId = new ArrayList<>();
        this.PlayerList = new HashMap<>();
        this.TotalCardList = new HashMap<>();
        this.ScoreList = new HashMap<>();
        this.RoundList = new ArrayList<>();
        this.roundLimit = roundLimit;
        this.maxPlayer = maxPlayer;
        this.openGame = true;
        this.LastCard = new Card("card", "card", "card", "card", "card", 0); //dummy card
        this.CurrentPlayer = "";
        this.TurnPattern = true;
    }

    public Game() {
        this.GameId = "";
        this.PlayerId = new ArrayList<>();
        this.PlayerList = new HashMap<>();
        this.ScoreList = new HashMap<>();
        this.TotalCardList = new HashMap<>();
        this.RoundList = new ArrayList<>();
        this.roundLimit = 0;
        this.maxPlayer = 0;
        this.openGame = true;
        this.LastCard = new Card("card", "card", "card", "card", "card", 0); //dummy card
        this.CurrentPlayer = "";
        this.TurnPattern = true;
    }

    public String getCurrentPlayer() {
        return CurrentPlayer;
    }

    public void setCurrentPlayer(String CurrentPlayer) {
        this.CurrentPlayer = CurrentPlayer;
    }

    public void setTurnPattern(Boolean TurnPattern) {
        this.TurnPattern = TurnPattern;
    }

    public Boolean getTurnPattern() {
        return TurnPattern;
    }

    public void setLastCard(Card LastCard) {
        this.LastCard = LastCard;
    }

    public Card getLastCard() {
        return LastCard;
    }

    public ArrayList<Round> getRoundList() {
        return RoundList;
    }

    public Boolean getOpenGame() {
        return openGame;
    }

    public int getMaxPlayer() {
        return maxPlayer;
    }

    public void setGameId(String GameId) {
        this.GameId = GameId;
    }

    public void setOpenGame(Boolean openGame) {
        this.openGame = openGame;
    }

    public void setRoundLimit(int roundLimit) {
        this.roundLimit = roundLimit;
    }

    public void setMaxPlayer(int maxPlayer) {
        this.maxPlayer = maxPlayer;
    }

    public String getGameId() {
        return GameId;
    }

    public Collection<Player> getPlayerList() {
        return PlayerList.values();
    }

    public int getRoundLimit() {
        return roundLimit;
    }

    public void setNextPlayer() {
        int indexxx = PlayerId.indexOf(this.CurrentPlayer);
        int psize = PlayerId.size();
        if (TurnPattern == true) {
            if (indexxx == psize - 1) {
                this.CurrentPlayer = PlayerId.get(0);
            } else {
                this.CurrentPlayer = PlayerId.get(indexxx + 1);
            }
        } else if (indexxx == 0) {
            this.CurrentPlayer = PlayerId.get(psize - 1);
        } else {
            this.CurrentPlayer = PlayerId.get(indexxx - 1);
        }
    }

    public int addPlayer(Player pl) {
        PlayerId.add(pl.getPlayerId());
        PlayerList.put(pl.getPlayerId(), pl);
        if (PlayerList.size() == maxPlayer) {
            return 1;
            // return 1 means lets start the game
        }
        return 0;
        // return 0, means need more player
    }

    public void startGame() {
        if (this.openGame == true) {
            this.openGame = false;
            Set<String> pl1 = PlayerList.keySet();
            for (String plId : pl1) {
                this.CurrentPlayer = plId;
                break;
            }
            createNewRound();
        }
    }

    public void createNewRound() {
        Card FirstCard = cdeck.drawOneCardv1();
        this.TurnPattern = true;
        this.LastCard = FirstCard;
        for (String pl : PlayerId) {
            ScoreList.put(pl, 0);
            TotalCardList.put(pl, 0);
        }
        if (this.RoundList.size() < roundLimit) {
            int newRoundId = this.RoundList.size() + 1;
            RoundList.add(new Round(newRoundId));
        }
    }
    
    public boolean canNewRound(){
        return this.RoundList.size() < roundLimit;
    }

    public void receiveScore(String playerId, int score, int totalCard) {
        ScoreList.put(playerId, score);
        TotalCardList.put(playerId, totalCard);
    }

    public String endRoundProcess() {
        Round rnd1 = RoundList.get(RoundList.size() - 1);
        int minimum = 10000;
        String tempWinner = "";
        Boolean someoneHaveSamePoint = false;
        int TotalPoint = 0;

        for (String pid : PlayerId) {
            if (TotalCardList.get(pid) == 0) {
                tempWinner = pid;
            }
            TotalPoint += ScoreList.get(pid);
        }

        // no one have no card
        if ("".equals(tempWinner)) {
            for (String pid : PlayerId) {
                if (ScoreList.get(pid) < minimum) {
                    minimum = ScoreList.get(pid);
                    tempWinner = pid;
                }
            }
            for (String pid : PlayerId) {
                if (pid.equals(tempWinner)) {
                } else if (ScoreList.get(pid) == minimum) {
                    someoneHaveSamePoint = true;
                }

            }

            if (someoneHaveSamePoint) {
                rnd1.roundEndProcess("no one", 0);
                return "0" + ";" + rnd1.getRoundId();
            } else {
                rnd1.roundEndProcess(tempWinner, TotalPoint);
            }
        } else {
            rnd1.roundEndProcess(tempWinner, TotalPoint);
        }
        return rnd1.getRoundId() + ";" + tempWinner + ";" + TotalPoint;
    }

    public void gameEndProcess() {
        // I am still not know what I should put in this function
    }

    @Override
    public String toString() {
        return "Game Id : " + this.GameId
                + "; Total Player : " + this.PlayerList.size()
                + "; Total Round : " + this.RoundList.size()
                + "; Round Limit : " + this.roundLimit
                + "; Max Player : " + this.maxPlayer
                + "; Open Game : " + this.openGame
                + "; Last Card : " + this.LastCard.getCardId()
                + "; Current Player : " + this.CurrentPlayer;
    }

    public Game copy() {
        Game copyGame = new Game();
        copyGame.GameId= this.GameId;
        copyGame.CurrentPlayer= this.CurrentPlayer;
        copyGame.LastCard = this.LastCard;
        copyGame.PlayerId = this.PlayerId;
        copyGame.PlayerList = this.PlayerList;
        copyGame.RoundList = this.RoundList;
        copyGame.ScoreList = this.ScoreList;
        copyGame.TotalCardList = this.TotalCardList;
        copyGame.TurnPattern = this.TurnPattern;
        copyGame.cdeck = this.cdeck;
        copyGame.maxPlayer = this.maxPlayer;
        copyGame.openGame = this.openGame;
        copyGame.roundLimit = this.roundLimit;
        return copyGame;
    }

}
