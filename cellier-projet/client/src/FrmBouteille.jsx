import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import FrmBouteilleInput from "./FrmBouteilleInput";
import "./FrmBouteille.scss";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

import DateSelecteur from "./DateSelecteur";
import DateSelecteurAnnee from "./DateSelecteurAnnee";


export default function FrmBouteille({
  bouteille,
  frmOuvert,
  setFrmOuvert,
  voirFiche,
  setVoirFiche,
  bouteille_type,
  quantite,
  setQuantite,
  dateAchat,
  setDateAchat,
  dateGarde,
  setDateGarde,
  modifierBouteille
}) {

  /**
   * L‘état d'erreur
   */
  const [openErr, setOpenErr] = React.useState(false);
  /**
   *  Gère l'action d'annuler
   */
  function viderFermerFrm() {
    setFrmOuvert(false);
    setVoirFiche(false);
  }
  /**
   * Gère l'action de soumettre
   */
  function gererSoumettre() {
    if (quantite >= 0) {
      modifierBouteille(quantite, dateAchat, dateGarde);
      setFrmOuvert(false);
    }
    else {
      if (quantite < 0)
        setOpenErr(true);
    }
  }

  return (
    <div>
      <Dialog open={frmOuvert} onClose={viderFermerFrm}>
        {/* {voirFiche === false ? (
          <DialogTitle> Modifier la quantité de la bouteille</DialogTitle>
        ) : (
          <DialogTitle> {bouteille_nom}</DialogTitle>
        )} */}
        <DialogContent>
          <div className="img">
            <img src={bouteille.image} alt="bouteille" />
          </div>
          <div className="description">
            <h2 className="nom">{bouteille.nom} </h2>
            <p className="type">{bouteille_type} - {bouteille.format} - {bouteille.pays}</p>
            <hr />
            <p className="description">Description : {bouteille.description}</p>
            <p className="millesime">Millesime : {bouteille.millesime}</p>
            <p className="millesime">Prix : {bouteille.prix_saq}.00$</p>
            <p>
              <a href={bouteille.url_saq}>Voir SAQ</a>
            </p>
            <div className={voirFiche === false ? "hidden" : ""}>
              <p className="quantite">Quantité : {bouteille.quantite}</p>
              <p className="date_achat">Date achat : {bouteille.date_achat}</p>
              <p className="date_achat">Date jusqu'à : {bouteille.garde_jusqua}</p>
            </div>
            <Dialog open={openErr}>
              <Alert severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => {
                      setOpenErr(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Invalid!
              </Alert>
            </Dialog>
          </div>
          <FrmBouteilleInput
            bouteille={bouteille}
            voirFiche={voirFiche}
            setQuantite={setQuantite}
          />
          <DateSelecteur
            voirFiche={voirFiche}
            bouteille={bouteille}
            dateAchat={dateAchat}
            setDateAchat={setDateAchat}
          />
          <DateSelecteurAnnee
            voirFiche={voirFiche}
            bouteille={bouteille}
            dateGarde={dateGarde}
            setDateGarde={setDateGarde}
          />
        </DialogContent>
        {voirFiche === false ? (
          <DialogActions>
            <Button onClick={viderFermerFrm}>Annuler</Button>
            <Button onClick={gererSoumettre}>Soumettre</Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button onClick={viderFermerFrm}>OK</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
