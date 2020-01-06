import React from "react";
import ImageGallery from "react-image-gallery";

class AdDisplay extends React.Component {
  render() {
    const items = [
      {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/1000/600/"
      },
      {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/1000/600/"
      },
      {
        original: "https://picsum.photos/id/1020/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/1000/600/"
      },
      {
        original: "https://picsum.photos/id/1021/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/1000/600/"
      }
    ];
    return (
      <div>
        <div className="hero is-small is-primary">
          <div className="hero-body">
            <div className="container has-text-justified">
              <p className="title is-4">Title</p>
              <div className="field is-grouped is-grouped-multiline">
                <div className="control">
                  <div className="tags has-addons">
                    <span className="tag is-light ">Category:</span>
                    <span className="tag is-white">For Kids</span>
                  </div>
                </div>
                <div className="control">
                  <div className="tags has-addons">
                    <span className="tag is-light">ID:</span>
                    <span className="tag is-white">1234512</span>
                  </div>
                </div>
                <div className="control">
                  <div className="tags has-addons">
                    <span className="tag is-light ">Created:</span>
                    <span className="tag is-white">25.12.2020 15:26</span>
                  </div>
                </div>
                <div className="control">
                  <div className="tags has-addons">
                    <span className="tag is-light ">Edited:</span>
                    <span className="tag is-white">25.12.2020 15:26</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container is-clipped">
          <div className="columns ad-display-content">
            <div className="column is-three-fifths">
              <ImageGallery
                items={items}
                showPlayButton={false}
                showIndex={true}
                showThumbnails={false}
              />
            </div>
            <div className="column is-two-fifths has-text-justified">
              <div
                className="notification is-white has-text-right"
                style={{ paddingLeft: 2, paddingRight: 2 }}
              >
                <div className="box level is-mobile">
                  <div className="level-left icon">
                    <span className="icon has-text-primary level-item">
                      <i className="fas fa-tags fa-2x"></i>
                    </span>
                  </div>
                  <div className="level-right">
                    <span className=" title is-2 level-item">$1231</span>
                  </div>
                </div>

                <div className="box level is-mobile">
                  <div className="level-left icon">
                    <span className="icon has-text-primary level-item">
                      <i className="fas fa-phone fa-2x"></i>
                    </span>
                  </div>
                  <div className="level-right">
                    <span className="title is-4 level-item">531 312 312</span>
                  </div>
                </div>

                <div className="box level is-mobile">
                  <div className="level-left icon">
                    <span className="icon has-text-primary level-item">
                      <i className="fas fa-envelope fa-2x"></i>
                    </span>
                  </div>
                  <div className="level-right">
                    <button className="button is-warning level-item">
                      <span className="title is-5">Message User</span>
                    </button>
                  </div>
                </div>
                <div className="box">
                  <div className="columns is-vcentered is-mobile">
                    <div className="column is-2">
                      <figure className="image is-96x96">
                        <img src="https://bulma.io/images/placeholders/128x128.png" />
                      </figure>
                    </div>
                    <div className="column has-text-right">
                      <p className="user-info-para">
                        <span className="icon has-text-primary user-info-icon">
                          <i className="fas fa-user-tie fa-lg"></i>
                        </span>
                        <span className="subtitle is-6">Andrzej Sapkowski</span>
                      </p>
                      <p className="user-info-para">
                        <span className="icon has-text-primary user-info-icon">
                          <i className="fas fa-map-marker-alt fa-lg"></i>
                        </span>
                        <span className="subtitle is-6">Kraków</span>
                      </p>
                      <p className="user-info-para">
                        <span className="icon has-text-primary user-info-icon">
                          <i className="fas fa-calendar-alt fa-lg"></i>
                        </span>
                        <span className="subtitle is-6">since 12.12.2020</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-full">
              <div
                className="notification is-white"
                style={{ paddingLeft: 2, paddingRight: 2 }}
              >
                <div className="box">
                  <span className="has-text-justified is-size-5">
                    Skup Samochodow Osobowych Dostawczych Kazde Auto Zadzwon
                    Gotowka Od Reki Szybki Dojazd Skupujemy auta do 50.000 zł od
                    osób prywatnych jak i firm.
                    <br />
                    <br />
                    - WSZYSTKIE MARKI I ROCZNIKI (BUSY I AUTA DO 3.5T )<br />
                    <br />
                    - W KAŻDYM STANIE (ZNISZCZONE, ZANIEDBANE, SKORODOWANE,
                    POWYPADKOWE)
                    <br />
                    <br />
                    - BEZ WAŻNEGO PRZEGLĄDU I OC
                    <br />
                    - PO FIRMACH
                    <br />
                    <br />
                    POSIADAMY WŁASNY TRANSPORT AUTO LAWETA.
                    <br />
                    <br />
                    ZAPEWNIAMY NATYCHMIASTOWY DOJAZD DO KLIENTA, ORAZ GOTÓWKĘ OD
                    RĘKI.
                    <br />
                    <br />
                    Płacimy gotówką lub przelewem, jak sobie Państwo życzą.
                    <br />
                    <br />
                    FORMALNOŚCI KUPNA ZAŁATWIAMY W 5 MINUT. WYCENA PRZEZ
                    TELEFON.
                    <br />
                    <br />
                    GRATIS!
                    <br />
                    ZWROT NIEWYKORZYSTANEGO OC - nawet do 2000 zł możecie
                    Państwo odzyskać od ubezpieczalni za niewykorzystany okres
                    polisy OC. Na miejscu otrzymacie od nas Państwo gotowy
                    dokument do wycofania polisy.
                    <br />
                    <br />
                    Zachęcamy Państwa do kontaktu telefonicznego, na pewno się
                    dogadamy.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="notification is-white message-box"
            style={{ paddingLeft: 2, paddingRight: 2 }}
          >
            <div className="box" style={{ marginBottom: 1 }}>
              <span className="title is-5">Send a message to seller</span>
            </div>
            <div className="box">
              <div className="columns is-centered">
                <div className="column is-full">
                  <textarea class="textarea" placeholder="Message contents" />
                  <hr />
                  <div className="columns is-centered">
                    <div className="column is-one-quarter">
                      <button class="button is-fullwidth is-primary">
                        <span className="title is-5">Send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AdDisplay;
