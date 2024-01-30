FROM mcr.microsoft.com/mssql/server:2019-latest
ENV ACCEPT_EULA=Y
ENV MSSQL_SA_PASSWORD=Foundry123!
WORKDIR /var/opt/mssql/data
COPY *.bak .
COPY . .