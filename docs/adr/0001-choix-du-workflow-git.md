# ADR 0001 · Utiliser Gitflow pour Courses Collaboratives
# Statut : accepté, le 13/10/2026.

## Contexte:
L'équipe est composée de 3 personnes. Le projet est actuellement en cours de développement pour la V1 et n'est pas encore en ligne. Une fois la V1 stable, nous livrerons les nouvelles fonctionnalités au fur et à mesure. Nous avons évalué et comparé GitHub Flow et Gitflow.

## Décision:
Nous avons choisi d'utiliser Gitflow afin de garantir une plus grande stabilité. Le déroulement de notre workflow se déroulle de la façon suivante :
Les branches de travail sont créées à partir de la branche de développement (dev).
L'intégration se fait via une Pull Request (PR) validée par au moins une relecture (code review).
La branche main est protégée.

## Conséquences:
Points positifs : Un cadre plus structuré et sécurisé pour l'équipe, avec une branche main protégée. Nous utiliserons une branches release pour préparer les mises en production des nouvelles fonctionnalités.
Points de vigilance : Un flux de travail plus long et plus exigeant en termes de gestion des branches.