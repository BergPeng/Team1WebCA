package com.unogame.data;

/*
* Owner : Uno Game First Team
* General Description of this Class : 
* - this class is to represent deck card
*
* Version Control :
* 1. 12/01/2015; Akwila; Create CardDeck Class
* 2. 14/01/2015; Akwila; Change CardId
* 3. 16/01/2015; Akwila; Change to adjust with CompleteCard Class
 */
import com.unogame.data.Card;
import java.io.Serializable;
import java.util.ArrayList;
import javax.enterprise.context.SessionScoped;

@SessionScoped
public class CardDeck implements Serializable {

    private static final long serialVersionUID = 1L;

    private ArrayList<Card> CardList;

    public CardDeck() {
        CompleteCard ccard = new CompleteCard();
        CardList = new ArrayList<>(ccard.getAllCard());
    }

    public void refreshCardDeck() {
        CompleteCard ccard = new CompleteCard();
        CardList = new ArrayList<>(ccard.getAllCard());
    }

    public String drawOneCard() {
        int size = this.CardList.size();
        if (size == 0) {
            return "0";
        } else {
            int i = (int) (Math.random() * size);
            Card drawCard = CardList.get(i);
            this.CardList.remove(i);
            return drawCard.getCardId();
        }
    }

    public Card drawOneCardv1() {
        int size = this.CardList.size();
        int i = (int) (Math.random() * size);
        Card drawCard = CardList.get(i);
        this.CardList.remove(i);
        return drawCard;

    }

    @Override
    public String toString() {
        return "Card in Deck " + CardList.size();
    }

}
