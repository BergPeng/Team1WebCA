package com.unogame.gamerule;

/*
* Owner : Uno Game First Team
* General Description of this Class : 
* - this class is the representative of one round
*
* Version Control :
* 1. 13/01/2015; Akwila; Create Round Class
* 
 */

import java.io.Serializable;
import java.util.HashMap;

public class Round implements Serializable {

    private static final long serialVersionUID = 1L;
    
    private final int RoundId;
    private String Winner;
    private int Score;

    public Round(int RoundId) {
        this.RoundId = RoundId;
        this.Winner = null;
        this.Score = 0;
    }

    public int getRoundId() {
        return RoundId;
    }

    public void roundEndProcess(String winner, int Score) {
        this.Winner = winner;
        this.Score = Score;
    }
}
